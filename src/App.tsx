import {
  CloseOutlined,
  FileAddOutlined,
  FileZipOutlined,
  FolderAddOutlined,
  ImportOutlined,
  PictureOutlined,
  PlusOutlined,
} from "@ant-design/icons"
import { Button, Input, Modal, Select, message } from "antd"
import { useRef, useState } from "react"
import { v4 } from "uuid"
import type { BMEFolder, BMEPath } from "../electron/services/types/suffix"
import packageJson from "../package.json"
import FixedListBox, { type FixedListBoxRef } from "./components/FixedListBox"
import useFormulas from "./hooks/useFormulas"
import useLang from "./hooks/useLang"
import m from "./locales"

const {
  selectPath,
  getAssetsPath,
  getUserProfile,
  getSep,
  pack,
  openExternal,
} = window.electronAPI
const sep = await getSep()
const root = await getAssetsPath()
const userProfile = await getUserProfile()

type Categories = keyof typeof assetsPreToSux
type AssetSuffix = (typeof assetsPreToSux)[Categories]
const assetsPreToSux = {
  Audios: "audio",
  Items: "item",
  Scenes: "scene",
  Scripts: "js",
  Materials: "mat",
  Meshes: "mesh",
  Textures: "tex",
} as const

const categories = Object.keys(assetsPreToSux) as Categories[]
const suffixes = Object.values(assetsPreToSux) as AssetSuffix[]

const warning = (content: string) => {
  message.destroy()
  message.warning({
    content,
    onClick: () => message.destroy(),
  })
}

const success = (content: string) => {
  message.destroy()
  message.success({
    content,
    onClick: () => message.destroy(),
  })
}

export default function App() {
  const folderRef = useRef<FixedListBoxRef>(null)
  const assetRef = useRef<FixedListBoxRef>(null)
  const iconRef = useRef<FixedListBoxRef>(null)

  const [isInputOpen, setIsInputOpen] = useState(false)
  const [inputValue, setInputValue] = useState("")

  const [isSelectOpen, setIsSelectOpen] = useState(false)
  const [selectedValue, setSelectedValue] = useState<string | undefined>(
    undefined,
  )

  const { formulas, deleteFormula, saveFormula } = useFormulas()
  const { lang, setLang } = useLang()

  const saveFormulaWithCheck = async () => {
    const name = inputValue.trim()
    if (!name) {
      warning(m("missingFormulaNameWarning"))
      return
    }

    const _saveFormula = async () => {
      await saveFormula(name, {
        folders: folderRef.current!.getItems(),
        extras: assetRef.current!.getItems(),
        icons: iconRef.current!.getItems(),
      })
      success(`保存成功: ${inputValue}`)
      setIsInputOpen(false)
    }

    const exists = Object.keys(formulas)
    if (exists.includes(name))
      Modal.confirm({
        title: m("overwriteWarningTitle"),
        content: m("overwriteWarningMessage", inputValue),
        okText: m("ok"),
        cancelText: m("cancel"),
        onOk: _saveFormula,
      })
    else _saveFormula()
  }

  const loadFormulasWithCheck = async () => {
    if (!selectedValue) {
      warning(m("noSelectedFormulaWarning"))
      return
    }
    const { folders, extras, icons } = formulas[selectedValue]
    folderRef.current!.setItems(folders)
    assetRef.current!.setItems(extras)
    iconRef.current!.setItems(icons)
    success(m("loadFormulaSuccess", selectedValue))
    setIsSelectOpen(false)
  }

  const setToNextLang = (step = 1) =>
    setLang(m.langs.at((m.langs.indexOf(lang) + step) % m.langs.length)!)

  return (
    <div>
      <div
        style={{
          padding: 20,
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <FixedListBox
          ref={folderRef}
          width={300}
          height={400}
          buttonText={m("addFolders")}
          buttonIcon={<FolderAddOutlined />}
          addContent={async () => {
            let warn = false

            const res: string[] = []
            for (let path of await selectPath({
              properties: ["openDirectory", "multiSelections"],
              defaultPath: root,
            })) {
              if (!path.startsWith(root)) {
                warn = true
                continue
              }

              path = path.replace(root + sep, "")

              if (
                !categories.some(
                  category =>
                    path.startsWith(category) && path.split(sep).length === 2,
                )
              ) {
                warn = true
                continue
              }

              res.push(path)
            }

            if (warn) warning(m("wrongFolderPathWarning"))

            return res
          }}
        />

        <FixedListBox
          ref={assetRef}
          width={300}
          height={400}
          buttonText={m("addAssets")}
          buttonIcon={<FileAddOutlined />}
          addContent={async () => {
            let warn = false

            const res: string[] = []
            for (let path of await selectPath({
              properties: ["openFile", "multiSelections"],
              defaultPath: root,
              filters: [{ name: "BME Assets", extensions: suffixes }],
            })) {
              if (!path.startsWith(root)) {
                warn = true
                continue
              }

              path = path.replace(root + sep, "")

              if (
                !categories.some(
                  category =>
                    path.startsWith(category) && path.split(sep).length === 3,
                )
              ) {
                warn = true
                continue
              }

              res.push(path)
            }

            if (warn) warning(m("wrongAssetPathWarning"))

            return res
          }}
        />

        <FixedListBox
          ref={iconRef}
          width={300}
          height={400}
          buttonText={m("addIcons")}
          buttonIcon={<PictureOutlined />}
          addContent={async () => {
            let warn = false

            const res: string[] = []
            const iconRoot = [root, "Scripts", "_Editor", "Icons"].join(sep)
            for (const path of await selectPath({
              properties: ["openFile", "multiSelections"],
              defaultPath: iconRoot,
              filters: [{ name: "BME Icons", extensions: ["tex"] }],
            })) {
              if (!path.startsWith(iconRoot)) {
                warn = true
                continue
              }
              res.push(path.split(sep).at(-1)!.replace(".tex", ""))
            }

            if (warn) warning(m("wrongIconPathWarning"))

            return res
          }}
        />
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "space-evenly",
          alignItems: "center",
        }}
      >
        <>
          <Modal
            title={m("formulaName")}
            open={isInputOpen}
            okText={m("ok")}
            cancelText={m("cancel")}
            onOk={saveFormulaWithCheck}
            onCancel={() => setIsInputOpen(false)}
          >
            <Input
              value={inputValue}
              size="large"
              onChange={e => setInputValue(e.target.value)}
              onPressEnter={saveFormulaWithCheck}
            />
          </Modal>
          <Button
            type="primary"
            size="large"
            icon={<PlusOutlined />}
            style={{
              width: "12%",
              backgroundColor: "#c03cd1",
            }}
            onClick={() => {
              setIsInputOpen(true)
              setInputValue("")
            }}
          >
            {m("save")}
          </Button>
        </>

        <>
          <Modal
            title={m("selectFormula")}
            open={isSelectOpen}
            okText={m("ok")}
            cancelText={m("cancel")}
            onOk={loadFormulasWithCheck}
            onCancel={() => setIsSelectOpen(false)}
          >
            <Select
              style={{ width: "100%" }}
              value={selectedValue}
              onChange={setSelectedValue}
              size="large"
              allowClear
              showSearch
              options={Object.keys(formulas).map(k => ({ label: k, value: k }))}
              optionRender={({ data: { label, value } }) => (
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    padding: "2px 0",
                  }}
                >
                  <span>{label}</span>
                  <CloseOutlined
                    onClick={e => {
                      e.stopPropagation()
                      Modal.confirm({
                        title: m("deleteWarningTitle"),
                        content: m("deleteWarningMessage", label),
                        okText: m("ok"),
                        cancelText: m("cancel"),
                        onOk: () => {
                          deleteFormula(value)
                          if (selectedValue === value)
                            setSelectedValue(undefined)
                        },
                      })
                    }}
                    style={{
                      fontSize: "12px",
                      color: "#666",
                      padding: "6px 6px",
                      borderRadius: "6px",
                      transition: "all 0.2s",
                    }}
                    onMouseEnter={e => {
                      e.currentTarget.style.color = "red"
                      e.currentTarget.style.background = "#fff1f0"
                    }}
                    onMouseLeave={e => {
                      e.currentTarget.style.color = "#666"
                      e.currentTarget.style.background = "transparent"
                    }}
                  />
                </div>
              )}
            ></Select>
          </Modal>
          <Button
            type="primary"
            size="large"
            icon={<ImportOutlined />}
            style={{
              width: "12%",
              backgroundColor: "#52c41a",
            }}
            onClick={async () => {
              setIsSelectOpen(true)
              setSelectedValue(undefined)
            }}
          >
            {m("import")}
          </Button>
        </>

        <Button
          type="primary"
          size="large"
          icon={<FileZipOutlined />}
          style={{
            width: "12%",
            backgroundColor: "#fa8c16",
          }}
          onClick={async () => {
            const chosen = await selectPath({
              properties: ["openDirectory"],
              defaultPath: `${userProfile}${sep}Desktop`,
            })
            if (!chosen.length) return
            const output = chosen[0]
            const folders = folderRef.current!.getItems() as BMEFolder[]
            const extras = assetRef.current!.getItems() as BMEPath[]
            const icons = iconRef.current!.getItems()

            message.loading(m("packing"), Infinity)
            const { notFound, zipSize } = await pack(output, {
              root,
              folders,
              extras,
              icons,
            })
            message.destroy()

            Modal.success({
              title: m("packSuccessTitle"),
              okText: m("ok"),
              content: m("packSuccessMessage", zipSize),
              onOk: () => {
                if (!notFound.size) return

                Modal.warning({
                  title: m("notFoundAssetWarningTitle"),
                  okText: m("ok"),
                  content: (
                    <div>
                      <div
                        style={{
                          maxHeight: 200,
                          marginBottom: 20,
                          overflow: "auto",
                          scrollbarWidth: "none",
                        }}
                      >
                        {[...notFound].map(p => (
                          <div key={v4()}>{p}</div>
                        ))}
                      </div>
                      <div
                        style={{
                          fontSize: 12,
                          color: "#333",
                        }}
                      >
                        {m("notFoundAssetWarningFooter")}
                      </div>
                    </div>
                  ),
                })
              },
            })
          }}
        >
          {m("zip")}
        </Button>
      </div>

      <Button
        type="text"
        onClick={() => setToNextLang()}
        onWheel={({ deltaY }) => setToNextLang(Math.sign(deltaY))}
        onMouseEnter={e => (e.currentTarget.style.color = "#eee")}
        onMouseLeave={e => (e.currentTarget.style.color = "#aaa")}
        style={{
          position: "absolute",
          top: "94.5%",
          transform: "translateY(-50%)",
          left: "1%",
          fontSize: 16,
          color: "#aaa",
          transition: "all 0.2s",
        }}
      >
        {m("abbr")}
      </Button>

      <div
        onClick={() => {
          Modal.info({
            title: (
              <a
                onClick={e => {
                  e.preventDefault()
                  openExternal(
                    "https://github.com/Withered-Flower-0422/bme-asset-packager",
                  )
                }}
              >
                {m("bmeAssetPackager")}
              </a>
            ),
            okText: m("ok"),
            content: (
              <div
                style={{
                  gap: 6,
                  padding: 8,
                  fontSize: 16,
                  fontWeight: "bold",
                  fontStyle: "italic",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <a
                  onClick={e => {
                    e.preventDefault()
                    openExternal("https://github.com/Withered-Flower-0422")
                  }}
                >
                  {m("author", packageJson.author)}
                </a>
                <a
                  onClick={e => {
                    e.preventDefault()
                    openExternal(
                      "https://github.com/Withered-Flower-0422/bme-asset-packager/releases",
                    )
                  }}
                >
                  {m("version", packageJson.version)}
                </a>
                <a
                  onClick={e => {
                    e.preventDefault()
                    openExternal(
                      "https://github.com/Withered-Flower-0422/bme-asset-packager/blob/main/LICENSE",
                    )
                  }}
                >
                  {m("license", packageJson.license)}
                </a>
              </div>
            ),
          })
        }}
        style={{
          position: "absolute",
          bottom: "1%",
          right: "1%",
          fontSize: 12,
        }}
      >
        {"Ver. " + packageJson.version}
      </div>
    </div>
  )
}

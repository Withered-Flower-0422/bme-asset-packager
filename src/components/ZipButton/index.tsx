import { FileZipOutlined } from "@ant-design/icons"
import { Button, Modal, message } from "antd"
import { type RefObject } from "react"
import { v4 } from "uuid"
import type {
  BMEFolder,
  BMEPath,
} from "../../../electron/services/types/suffix"
import type { FixedListBoxRef } from "../../components/FixedListBox"
import t from "../../locales"
import { root, sep, userProfile } from "../../utils/sys"
import styles from "./index.module.css"

const { selectPath, pack } = window.electronAPI

export default function ZipButton({
  folderRef,
  assetRef,
  iconRef,
}: {
  folderRef: RefObject<FixedListBoxRef>
  assetRef: RefObject<FixedListBoxRef>
  iconRef: RefObject<FixedListBoxRef>
}) {
  return (
    <Button
      className={styles.self}
      type="primary"
      size="large"
      icon={<FileZipOutlined />}
      onClick={async () => {
        const chosen = await selectPath({
          properties: ["openDirectory"],
          defaultPath: `${userProfile}${sep}Desktop`,
        })
        if (!chosen.length) return
        const output = chosen[0]
        const folders = folderRef.current.getItems() as BMEFolder[]
        const extras = assetRef.current.getItems() as BMEPath[]
        const icons = iconRef.current.getItems()

        message.loading(t("packing"), Infinity)
        const { notFound, zipSize } = await pack(output, {
          root,
          folders,
          extras,
          icons,
        })
        message.destroy()

        Modal.success({
          title: t("packSuccessTitle"),
          okText: t("ok"),
          content: t("packSuccessMessage", zipSize),
          onOk: () => {
            if (!notFound.size) return

            Modal.warning({
              title: t("notFoundAssetWarningTitle"),
              okText: t("ok"),
              content: (
                <div>
                  <div className={styles.warningContainer}>
                    {[...notFound].map(p => (
                      <div key={v4()}>{p}</div>
                    ))}
                  </div>
                  <div className={styles.warningFooter}>
                    {t("notFoundAssetWarningFooter")}
                  </div>
                </div>
              ),
            })
          },
        })
      }}
    >
      {t("zip")}
    </Button>
  )
}

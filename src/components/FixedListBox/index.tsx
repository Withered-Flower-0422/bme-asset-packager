import { CloseOutlined, DeleteOutlined } from "@ant-design/icons"
import { Button } from "antd"
import {
  forwardRef,
  useImperativeHandle,
  useState,
  type ReactNode,
} from "react"
import { v4 } from "uuid"
import styles from "./index.module.css"

export interface FixedListBoxRef {
  getItems: () => string[]
  setItems: (data: string[]) => void
}

interface FixedListBoxProps {
  width: number
  height: number
  buttonText: string
  buttonIcon: ReactNode
  addContent: () => Promise<string[]>
  initialData?: string[]
  onDropFiles?: (files: string[]) => string[]
  disableDirectories?: boolean
  disableFiles?: boolean
}

const { isFile, isDir, getFilePath } = window.electronAPI

const FixedListBox = forwardRef<FixedListBoxRef, FixedListBoxProps>(
  (
    {
      width,
      height,
      buttonText,
      buttonIcon,
      addContent,
      initialData = [],
      onDropFiles = files => files,
      disableDirectories = false,
      disableFiles = false,
    },
    ref,
  ) => {
    const [items, setItems] = useState<{ id: string; content: string }[]>(
      initialData.map(content => ({ id: v4(), content })),
    )
    const [dragging, setDragging] = useState(false)

    const addItems = (newContents: string[]) =>
      setItems(prev => [
        ...prev.filter(({ content }) => !newContents.includes(content)),
        ...newContents.map(content => ({ id: v4(), content })),
      ])

    useImperativeHandle(ref, () => ({
      getItems: () => items.map(({ content }) => content),
      setItems: (data: string[]) =>
        setItems(data.map(content => ({ id: v4(), content }))),
    }))

    return (
      <div>
        <div
          className={`${styles.self} ${dragging ? styles.dragging : ""} `}
          onDragOver={e => {
            e.preventDefault()
            e.stopPropagation()
            setDragging(true)
          }}
          onDragLeave={e => {
            e.preventDefault()
            e.stopPropagation()
            setDragging(false)
          }}
          onDrop={async e => {
            e.preventDefault()
            e.stopPropagation()
            setDragging(false)

            const valid: string[] = []
            for (const file of [...e.dataTransfer.files].map(file =>
              getFilePath(file),
            ))
              if (
                (!disableDirectories && (await isDir(file))) ||
                (!disableFiles && (await isFile(file)))
              )
                valid.push(file)

            addItems(onDropFiles(valid))
          }}
          style={{ width, height }}
        >
          {items.map(item => (
            <div key={item.id} className={styles.item}>
              <div className={styles.itemContent}>{item.content}</div>
              <Button
                danger
                type="text"
                icon={<CloseOutlined />}
                onClick={() =>
                  setItems(prev => prev.filter(({ id }) => id !== item.id))
                }
              />
            </div>
          ))}
        </div>

        <div className={styles.buttons}>
          <Button
            danger
            type="primary"
            icon={<DeleteOutlined />}
            onClick={() => setItems([])}
            style={{ width: "12.5%" }}
          />
          <Button
            type="primary"
            icon={buttonIcon}
            onClick={async () => addItems(await addContent())}
            style={{ width: "85%" }}
          >
            {buttonText}
          </Button>
        </div>
      </div>
    )
  },
)

export default FixedListBox

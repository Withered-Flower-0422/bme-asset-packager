import { CloseOutlined, DeleteOutlined } from "@ant-design/icons"
import { Button } from "antd"
import {
  forwardRef,
  useImperativeHandle,
  useState,
  type ReactNode,
} from "react"
import { v4 } from "uuid"
import style from "./index.module.css"

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
}

const FixedListBox = forwardRef<FixedListBoxRef, FixedListBoxProps>(
  (
    { width, height, buttonText, buttonIcon, addContent, initialData = [] },
    ref,
  ) => {
    const [items, setItems] = useState<{ id: string; content: string }[]>(
      initialData.map(content => ({ id: v4(), content })),
    )

    useImperativeHandle(ref, () => ({
      getItems: () => items.map(({ content }) => content),
      setItems: (data: string[]) =>
        setItems(data.map(content => ({ id: v4(), content }))),
    }))

    return (
      <div>
        <div className={style.self} style={{ width, height }}>
          {items.map(item => (
            <div key={item.id} className={style.item}>
              <div className={style.itemContent}>{item.content}</div>
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

        <div className={style.buttons}>
          <Button
            danger
            type="primary"
            icon={<DeleteOutlined />}
            onClick={async () => setItems([])}
            style={{ width: "12.5%" }}
          />
          <Button
            type="primary"
            icon={buttonIcon}
            onClick={async () => {
              const newContents = await addContent()
              setItems(prev => [
                ...prev.filter(({ content }) => !newContents.includes(content)),
                ...newContents.map(content => ({ id: v4(), content })),
              ])
            }}
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

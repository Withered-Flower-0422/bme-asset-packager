import {
  useState,
  forwardRef,
  useImperativeHandle,
  type ReactNode,
} from "react"
import { Button } from "antd"
import { CloseOutlined, DeleteOutlined } from "@ant-design/icons"
import { v4 } from "uuid"

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
      <div style={{ width: "fit-content" }}>
        <div
          style={{
            width,
            height,
            backgroundColor: "#333",
            overflow: "auto",
            borderRadius: "8px",
            marginBottom: "8px",
          }}
        >
          {items.map(item => (
            <div
              key={item.id}
              style={{
                padding: "2px 8px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
                gap: "8px",
              }}
            >
              <div
                style={{
                  flex: 1,
                  minWidth: 0,
                  textAlign: "left",
                  lineBreak: "anywhere",
                  color: "#eee",
                  display: "block",
                  fontSize: 14,
                }}
              >
                {item.content}
              </div>
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

        <div style={{ display: "flex", justifyContent: "space-between" }}>
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

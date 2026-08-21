import { FolderViewOutlined } from "@ant-design/icons"
import { Button } from "antd"
import { root } from "../../utils/sys"
import styles from "./index.module.css"

export default function OpenAssetFolder() {
  return (
    <Button
      className={styles.self}
      type="text"
      onClick={() => electronAPI.openPath(root)}
    >
      <FolderViewOutlined />
    </Button>
  )
}

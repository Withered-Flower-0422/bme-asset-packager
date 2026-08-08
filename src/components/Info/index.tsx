import { Modal } from "antd"
import packageJson from "../../../package.json"
import t from "../../locales"
import cc from "../../utils/cls"
import InfoLink from "../InfoLink"
import "./index.css"

const c = cc("info")

export default function Info() {
  return (
    <div
      className={c()}
      onClick={() => {
        Modal.info({
          title: (
            <InfoLink link="https://github.com/Withered-Flower-0422/bme-asset-packager">
              {t("bmeAssetPackager")}
            </InfoLink>
          ),
          content: (
            <div className={c("links")}>
              <InfoLink link="https://github.com/Withered-Flower-0422">
                {t("author", packageJson.author)}
              </InfoLink>
              <InfoLink link="https://github.com/Withered-Flower-0422/bme-asset-packager/releases">
                {t("version", packageJson.version)}
              </InfoLink>
              <InfoLink link="https://github.com/Withered-Flower-0422/bme-asset-packager/blob/main/LICENSE">
                {t("license", packageJson.license)}
              </InfoLink>
            </div>
          ),
          okText: t("ok"),
        })
      }}
    >
      {"Ver. " + packageJson.version}
    </div>
  )
}

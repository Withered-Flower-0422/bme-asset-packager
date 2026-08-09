import { Modal } from "antd"
import packageJson from "../../../package.json"
import t from "../../locales"
import InfoLink from "../InfoLink"
import style from "./index.module.css"

export default function Info() {
  return (
    <div
      className={style.self}
      onClick={() => {
        Modal.info({
          title: (
            <InfoLink link="https://github.com/Withered-Flower-0422/bme-asset-packager">
              {t("bmeAssetPackager")}
            </InfoLink>
          ),
          content: (
            <div className={style.links}>
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

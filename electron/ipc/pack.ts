import BMEAssetsPacker from "../services/core/bmeAssetsPacker"
import type { HandlersSatisfier } from "."

export default {
  pack: (_, ...args: ConstructorParameters<typeof BMEAssetsPacker>) =>
    new BMEAssetsPacker(...args).pack(),
} satisfies HandlersSatisfier

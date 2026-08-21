const { getAssetsPath, getUserProfile, getSep } = electronAPI

export const sep = await getSep()
export const root = await getAssetsPath()
export const userProfile = await getUserProfile()

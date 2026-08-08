const { getAssetsPath, getUserProfile, getSep } = window.electronAPI

export const sep = await getSep()
export const root = await getAssetsPath()
export const userProfile = await getUserProfile()

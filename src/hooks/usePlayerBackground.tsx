import { colors } from '@/constants/tokens'
import { useEffect, useState } from 'react'
import { getColors } from 'react-native-image-colors'
import { AndroidImageColors, IOSImageColors } from 'react-native-image-colors/build/types'

type ImageColors = IOSImageColors | AndroidImageColors | null

export const usePlayerBackground = (imageUrl: string) => {
	const [imageColors, setImageColors] = useState<ImageColors>(null)

	useEffect(() => {
		getColors(imageUrl, {
			fallback: colors.background,
			cache: true,
			key: imageUrl,
		}).then((colors) => {
			if (colors.platform === 'android' || colors.platform === 'ios') {
				setImageColors(colors)
			}
		})
	}, [imageUrl])

	return { imageColors }
}

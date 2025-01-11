import { StackScreenWithSearchBar } from '@/constants/layout'
import { defaultStyles } from '@/styles'
import { Stack } from 'expo-router'
import { View } from 'react-native'

const ArtistsScreenLayout = () => {
	return (
		<View style={defaultStyles.container}>
			<Stack>
				<Stack.Screen name="index" options={StackScreenWithSearchBar('Artists')} />
			</Stack>
		</View>
	)
}

export default ArtistsScreenLayout

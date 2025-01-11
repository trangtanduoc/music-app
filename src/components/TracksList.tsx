import { utilsStyles } from '@/styles'
import { FlatList, FlatListProps, View } from 'react-native'
import { TrackListItem } from './TracksListItem'

export type TracksListProps = Partial<FlatListProps<unknown>> & {
	tracks: any[]
}

const ItemDivider = () => (
	<View style={{ ...utilsStyles.itemSeparator, marginLeft: 80, marginVertical: 12 }} />
)

export const TracksList = ({ tracks, ...flatlistProps }: TracksListProps) => {
	return (
		<FlatList
			data={tracks}
			contentContainerStyle={{ paddingTop: 10, paddingBottom: 100 }}
			ListFooterComponent={ItemDivider}
			ItemSeparatorComponent={ItemDivider}
			renderItem={({ item: track }) => (
				<TrackListItem
					track={{
						...track,
						image: track.artwork,
					}}
				/>
			)}
			showsVerticalScrollIndicator={true}
			showsHorizontalScrollIndicator={false}
			{...flatlistProps}
		/>
	)
}

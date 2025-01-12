import { unknownTrackImageUri } from '@/constants/images'
import { colors } from '@/constants/tokens'
import { defaultStyles } from '@/styles'
import { Entypo, Ionicons } from '@expo/vector-icons'
import React from 'react'
import { StyleSheet, Text, TouchableHighlight, View } from 'react-native'
import FastImage from 'react-native-fast-image'
import LoaderKit from 'react-native-loader-kit'
import { Track, useActiveTrack, useIsPlaying } from 'react-native-track-player'
import { TrackShortcutsMenu } from './TrackShortcutsMenu'
import { StopPropagation } from './utils/StopPropagation'

export type TrackListItemProps = {
	track: Track
	onTrankSelect: (track: Track) => void
}

export const TrackListItem = ({ track, onTrankSelect: handleTrackSelect }: TrackListItemProps) => {
	const { playing } = useIsPlaying()

	const isActiveTrack = useActiveTrack()?.url === track.url

	return (
		<TouchableHighlight onPress={() => handleTrackSelect(track)}>
			<View style={styles.trackItemContainer}>
				<View>
					<FastImage
						source={{
							uri: track.artwork ?? unknownTrackImageUri,
							priority: FastImage.priority.normal,
						}}
						style={{
							...styles.trackArtworkImage,
							opacity: isActiveTrack ? 0.6 : 1,
						}}
					/>

					{isActiveTrack &&
						(playing ? (
							<LoaderKit
								style={styles.trackPlayingIconIndicator}
								name="LineScaleParty"
								color={colors.icon}
							/>
						) : (
							<Ionicons
								style={styles.trackPausedIndicator}
								name="play"
								size={24}
								color={colors.icon}
							/>
						))}
				</View>

				<View
					style={{
						flex: 1,
						flexDirection: 'row',
						justifyContent: 'space-between',
						alignItems: 'center',
					}}
				>
					<View style={{ width: '100%' }}>
						<Text
							numberOfLines={1}
							style={{
								...styles.trackTitleText,
								color: isActiveTrack ? colors.primary : colors.text,
							}}
						>
							{track.title}
						</Text>
						{track.artist && (
							<Text numberOfLines={1} style={styles.trackArtistText}>
								{track.artist}
							</Text>
						)}
					</View>
					<StopPropagation>
						<TrackShortcutsMenu track={track}>
							<Entypo name="dots-three-horizontal" size={18} color={colors.icon} />
						</TrackShortcutsMenu>
					</StopPropagation>
				</View>
			</View>
		</TouchableHighlight>
	)
}

const styles = StyleSheet.create({
	trackItemContainer: {
		flexDirection: 'row',
		columnGap: 14,
		alignItems: 'center',
		paddingRight: 20,
		height: 70,
	},
	trackPlayingIconIndicator: {
		position: 'absolute',
		top: 18,
		left: 18,
		width: 26,
		height: 26,
	},
	trackPausedIndicator: {
		position: 'absolute',
		top: 18,
		left: 18,
	},
	trackArtworkImage: {
		borderRadius: 8,
		width: 60,
		height: 60,
	},
	trackTitleText: {
		...defaultStyles.text,
		fontSize: 24,
		fontWeight: '600',
		maxWidth: '90%',
	},
	trackArtistText: {
		...defaultStyles.text,
		color: colors.textMuted,
		fontSize: 20,
		marginTop: 4,
	},
})

import React, { useContext } from 'react';
import { Text, TouchableOpacity } from 'react-native';

import styles from '../styles';
import Avatar from '../../Avatar';
import MessageboxContext from '../Context';
import FixedMentionItem from './FixedMentionItem';
import MentionEmoji from './MentionEmoji';
import { MENTIONS_TRACKING_TYPE_COMMANDS, MENTIONS_TRACKING_TYPE_EMOJIS } from '../constants';
import { themes } from '../../../constants/colors';
import { IEmoji } from '../../EmojiPicker/interfaces';

interface IMessageBoxMentionItem {
	item: {
		name: string;
		command: string;
		username: string;
		t: string;
		id: string;
	} & IEmoji;
	trackingType: string;
	theme: string;
}

const MentionItem = ({ item, trackingType, theme }: IMessageBoxMentionItem) => {
	const context = useContext(MessageboxContext);
	const { onPressMention } = context;

	const defineTestID = (type: string) => {
		switch (type) {
			case MENTIONS_TRACKING_TYPE_EMOJIS:
				return `mention-item-${item.name || item}`;
			case MENTIONS_TRACKING_TYPE_COMMANDS:
				return `mention-item-${item.command || item}`;
			default:
				return `mention-item-${item.username || item.name || item}`;
		}
	};

	const testID = defineTestID(trackingType);

	if (item.username === 'all' || item.username === 'here') {
		return <FixedMentionItem item={item} onPress={onPressMention} theme={theme} />;
	}

	let content = (
		<>
			<Avatar style={styles.avatar} text={item.username || item.name} size={30} type={item.t} />
			<Text style={[styles.mentionText, { color: themes[theme].titleText }]}>{item.username || item.name || item}</Text>
		</>
	);

	if (trackingType === MENTIONS_TRACKING_TYPE_EMOJIS) {
		content = (
			<>
				<MentionEmoji item={item} />
				<Text style={[styles.mentionText, { color: themes[theme].titleText }]}>:{item.name || item}:</Text>
			</>
		);
	}

	if (trackingType === MENTIONS_TRACKING_TYPE_COMMANDS) {
		content = (
			<>
				<Text style={[styles.slash, { backgroundColor: themes[theme].borderColor, color: themes[theme].tintColor }]}>/</Text>
				<Text style={[styles.mentionText, { color: themes[theme].titleText }]}>{item.id}</Text>
			</>
		);
	}

	return (
		<TouchableOpacity
			style={[
				styles.mentionItem,
				{
					backgroundColor: themes[theme].auxiliaryBackground,
					borderTopColor: themes[theme].separatorColor
				}
			]}
			onPress={() => onPressMention(item)}
			testID={testID}>
			{content}
		</TouchableOpacity>
	);
};

export default MentionItem;

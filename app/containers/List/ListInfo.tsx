import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import sharedStyles from '../../views/Styles';
import { themes } from '../../constants/colors';
import { withTheme } from '../../theme';
import { PADDING_HORIZONTAL } from './constants';
import I18n from '../../i18n';

const styles = StyleSheet.create({
	container: {
		paddingTop: 8,
		paddingHorizontal: PADDING_HORIZONTAL
	},
	text: {
		fontSize: 14,
		...sharedStyles.textRegular
	}
});

interface IListHeader {
	info: string;
	theme: string;
	translateInfo: boolean;
}

const ListInfo = React.memo(({ info, theme, translateInfo = true }: IListHeader) => (
	<View style={styles.container}>
		<Text style={[styles.text, { color: themes[theme].infoText }]}>{translateInfo ? I18n.t(info) : info}</Text>
	</View>
));

ListInfo.displayName = 'List.Info';

export default withTheme(ListInfo);

import React from 'react';
import { FlatList, Text, View } from 'react-native';

import { Button } from '../components/base/Button';
import Device from '../components/device/Device';
import DrawerScreenWrapper from '../components/drawer/DrawerScreenWrapper';
import VirtualizedListWrapper from '../components/layout/VirtualizedListWrapper';
import OverviewStats from '../containers/OverviewStats';
import tw from '../lib/tailwind';
import type { TabScreenProps } from '../navigation/TabNavigator';

const placeholderOverviewStats = {
	id: 1,
	total_bytes_capacity: '8093333345230',
	preview_media_bytes: '2304387532',
	library_db_size: '83345230',
	total_file_count: 20342345,
	total_bytes_free: '89734502034',
	total_bytes_used: '8093333345230',
	total_unique_bytes: '9347397',
	date_captured: '2020-01-01'
};

const placeholderDevices: any = [
	{
		name: "James' iPhone 12",
		size: '47.9GB',
		locations: [],
		type: 'phone'
	},
	{
		name: "James' MacBook Pro",
		size: '1TB',
		locations: [],
		type: 'laptop'
	},
	{
		name: "James' Toaster",
		size: '1PB',
		locations: [],
		type: 'desktop'
	},
	{
		name: 'Spacedrive Server',
		size: '5GB',
		locations: [],
		type: 'server'
	}
];

export default function OverviewScreen({ navigation }: TabScreenProps<'Overview'>) {
	return (
		<DrawerScreenWrapper>
			<VirtualizedListWrapper>
				<View style={tw`px-4`}>
					{/* Header */}
					<View style={tw`flex-row my-6 justify-center items-center`}>
						{/* TODO: Header with a button to open drawer! */}
						<Button variant="primary" size="lg" onPress={() => navigation.openDrawer()}>
							<Text style={tw`font-bold text-white`}>Open Drawer</Text>
						</Button>
					</View>
					{/* Stats */}
					<OverviewStats stats={placeholderOverviewStats} />
					<View style={tw`mt-4`} />
					{/* Devices */}
					<FlatList
						data={placeholderDevices}
						keyExtractor={(item, index) => index.toString()}
						renderItem={({ item }) => (
							<Device locations={[]} name={item.name} size={item.size} type={item.type} />
						)}
					/>
				</View>
			</VirtualizedListWrapper>
		</DrawerScreenWrapper>
	);
}
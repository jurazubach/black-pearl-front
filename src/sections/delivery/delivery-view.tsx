'use client';

import React from 'react';
import MainLayout from 'src/layouts/main';
import DeliveryTypes from './delivery-types';
import DeliveryReturns from './delivery-returns';

export default function DeliveryView() {
	return (
		<MainLayout>
			<DeliveryTypes />
			<DeliveryReturns />
		</MainLayout>
	);
}

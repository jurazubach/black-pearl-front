'use client';

import React from 'react';
import { m } from 'framer-motion';

import { MotionContainer, varFade } from 'src/components/animate';
import DeliveryTypes from './delivery-types';
import DeliveryReturns from './delivery-returns';

export default function DeliveryView() {
	return (
		<MotionContainer>
			<m.div variants={varFade().in}>
				<DeliveryTypes />
				<DeliveryReturns />
			</m.div>
		</MotionContainer>
	);
}

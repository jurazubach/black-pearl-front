'use client';

import React from 'react';
import { m } from 'framer-motion';

import ContainerTitle from 'src/components/container-title';
import { MotionContainer, varFade } from 'src/components/animate';
import ContactsForm from './contacts-form';
import ContactsList from './contacts-list';

export default function ContactsView() {
  return (
    <MotionContainer>
      <m.div variants={varFade().in}>
        <ContainerTitle center title="Контакти" description="Не соромтеся та звертайтеся до нас, ми будемо раді почути Вас." />
        <ContactsList />

        <ContainerTitle center title="Форма зворотнього зв'язку" />
        <ContactsForm />
      </m.div>
    </MotionContainer>
  );
}

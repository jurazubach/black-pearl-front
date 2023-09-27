'use client';

import React from 'react';
import ContainerTitle from 'src/components/container-title';
import MainLayout from 'src/layouts/main';
import ContactsForm from '../contacts-form';
import ContactsList from './contacts-list';

export default function ContactsView() {
  return (
    <MainLayout>
      <ContainerTitle center title="Контакти" description="Не соромтеся та звертайтеся до нас, ми будемо раді почути Вас." />
      <ContactsList />

      <ContainerTitle center title="Форма зворотнього зв'язку" />
      <ContactsForm />
    </MainLayout>
  );
}

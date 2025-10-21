"use client"
import { List } from '@telegram-apps/telegram-ui';

import { Page } from '@/components/Page';
import ListCardProduct from '@/components/ListCard/ListCardProduct';


export default function Home() {

  return (
    <Page back={false}>
      <List>
        <ListCardProduct/>

  
      </List>
    </Page>
  );
}

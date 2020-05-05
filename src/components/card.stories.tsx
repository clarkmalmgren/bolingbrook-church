import React from 'react'
import Card from './card'
import { withKnobs, text, boolean, number } from '@storybook/addon-knobs'
import { action } from '@storybook/addon-actions';
import { MemoryRouter } from 'react-router';
import { Typography } from '@material-ui/core';

const withMemoryRouter = (story: any) => (<MemoryRouter>{story()}</MemoryRouter>)

export default {
  component: Card,
  title: 'Card',
  decorators: [withKnobs, withMemoryRouter]
}

export const TextOnly = () => (
  <Card title={text('Title', 'This is a title')}
        subtitle={text('Subtitle', 'Subtitle')}
        onClick={action('clicked')}
  ></Card>
)

export const WithImage = () => (
  <Card title={text('Title', 'Bible Study')}
        subtitle={text('Subtitle', 'Together we grow')}
        onClick={action('clicked')}
        image={text('Image', 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Gutenberg_Bible%2C_Lenox_Copy%2C_New_York_Public_Library%2C_2009._Pic_01.jpg/640px-Gutenberg_Bible%2C_Lenox_Copy%2C_New_York_Public_Library%2C_2009._Pic_01.jpg')}
  ></Card>
)

export const WithLink = () => (
  <Card title={text('Title', 'Bible Study')}
        subtitle={text('Subtitle', 'Together we grow')}
        image={text('Image', 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Gutenberg_Bible%2C_Lenox_Copy%2C_New_York_Public_Library%2C_2009._Pic_01.jpg/640px-Gutenberg_Bible%2C_Lenox_Copy%2C_New_York_Public_Library%2C_2009._Pic_01.jpg')}
        link={text('Link', '/?path=/story/card--with-image')}>
      Note that Local links (starting with /) won't actually work here because the routing
      doesn't affect the outer container. Still fun though.
  </Card>
)


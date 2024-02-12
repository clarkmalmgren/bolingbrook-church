import type { Meta, StoryObj } from '@storybook/react'
import { Button } from './Button'

const meta: Meta<typeof Button> = {
  component: Button
}

export default meta
type Story = StoryObj<typeof Button>

export const Primary: Story = {
  args: {
    children: 'Volunteer'
  }
}

export const MenuItem: Story = {
  args: {
    children: 'Sermons',
    variant: 'text',
    size: 'md'
  }
}

export const SubSectionHeader: Story = {
  args: {
    children: '1st Saturday',
    size: 'sm',
    variant: 'pill'
  }
}

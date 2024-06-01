'use server'

import { revalidatePath } from 'next/cache'

export async function bustCache(sermons?: boolean): Promise<void> {
  revalidatePath('/(main)/sermons')
  revalidatePath('/(main)/sermons/[date]')
  if (!sermons) {
    revalidatePath('/(main)/[[...path]]')
  }
}

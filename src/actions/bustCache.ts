'use server'

import { revalidatePath } from 'next/cache'

export async function bustCache(sermons?: boolean): Promise<void> {
  revalidatePath('/(main)/sermons', 'page')
  revalidatePath('/(main)/sermons/[date]', 'page')
  if (!sermons) {
    revalidatePath('/(main)/[[...path]]', 'page')
  }
}

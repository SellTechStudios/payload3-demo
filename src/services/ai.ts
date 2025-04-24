import { embed } from '@nomic-ai/atlas'

const MODEL = 'nomic-embed-text-v1.5'

export type EmbedTaskType = 'search_document' | 'search_query'

export function Embed(values: string, type: EmbedTaskType): Promise<number[]>
export function Embed(values: string[], type: EmbedTaskType): Promise<number[][]>

export async function Embed(values: string[] | string, type: EmbedTaskType = 'search_query') {
  const arr = typeof values === 'string' ? [values] : values

  const result = await embed(arr, { model: MODEL, taskType: type }, undefined)
  return typeof values === 'string'
    ? (result[0] as unknown as number[])
    : (result as unknown as number[][])
}

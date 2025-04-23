'use client'

import { Button, TextInput, useField, useForm, useFormFields } from '@payloadcms/ui'
import React, { memo, useCallback, useMemo } from 'react'

import type { ArrayFieldClientComponent } from 'payload'

/**
 * Interface for Tag component props
 */
interface TagProps {
  /** Unique identifier for the tag */
  id: string
  /** Display value of the tag */
  value: string
  /** Callback function to remove the tag */
  onRemove: (index: number) => void
  /** Index of the tag in the array */
  index: number
}

/**
 * Memoized Tag component that renders an individual tag with delete functionality
 * @component
 */
const Tag = memo(({ id, value, onRemove, index }: TagProps) => (
  <div
    onClick={() => onRemove(index)}
    style={{
      backgroundColor: '#292929',
      padding: '4px 12px',
      borderRadius: '4px',
      display: 'flex',
      alignItems: 'center',
      gap: '4px',
      cursor: 'pointer',
    }}
  >
    {value}
  </div>
))

Tag.displayName = 'Tag'

/**
 * Custom array field component for managing tags in Payload CMS
 * @component
 * @param {Object} props - Component props from Payload CMS
 * @param {string} props.path - Path to the field in the form
 * @param {Object} props.field - Field configuration from Payload CMS
 */
const TagsArrayComponent: ArrayFieldClientComponent = ({ path, field, ...props }) => {
  const { rows } = useField({ path, hasRows: true })
  const { addFieldRow, removeFieldRow, setModified } = useForm()
  const { dispatch } = useFormFields(([_, dispatch]) => ({ dispatch }))
  const [newTagValue, setNewTagValue] = React.useState('')

  /**
   * Get tag values from form fields
   */
  const tags = useFormFields(([fields]) =>
    rows?.map((row, index) => ({
      id: row.id,
      value: fields[`${path}.${index}.tag`]?.value || '',
    })),
  )

  /**
   * Handles adding a new tag to the array
   */
  const handleAddRow = useCallback(() => {
    if (!newTagValue.trim()) return

    addFieldRow({
      path: 'tags',
      schemaPath: `${path}.0.tag`,
    })

    setTimeout(() => {
      dispatch({
        type: 'UPDATE',
        path: `${path}.${rows?.length || 0}.tag`,
        value: newTagValue.trim(),
      })
      setNewTagValue('')
      setModified(true)
    }, 0)
  }, [addFieldRow, dispatch, path, rows?.length, newTagValue, setModified])

  /**
   * Handles Enter key press in the input field
   */
  const handleKeyPress = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === 'Enter') {
        e.preventDefault()
        handleAddRow()
      }
    },
    [handleAddRow],
  )

  /**
   * Handles removing a tag from the array
   */
  const handleRemoveTag = useCallback(
    (index: number) => {
      removeFieldRow({ path, rowIndex: index })
      setModified(true)
    },
    [removeFieldRow, path, setModified],
  )

  /**
   * Memoized tag list rendering
   */
  const tagList = useMemo(
    () => (
      <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
        {tags?.map((tag, index) => (
          <Tag
            key={tag.id}
            id={tag.id}
            value={tag.value as string}
            onRemove={handleRemoveTag}
            index={index}
          />
        ))}
      </div>
    ),
    [tags, handleRemoveTag],
  )

  return (
    <div>
      <h4>Tags</h4>

      <div style={{ marginTop: '12px', display: 'flex', gap: '8px', alignItems: 'center' }}>
        <TextInput
          path={`${path}.newTag`}
          onChange={(e) => setNewTagValue(e.target.value)}
          placeholder="Enter tag name"
          onKeyDown={handleKeyPress}
          value={newTagValue}
        />
        <Button onClick={handleAddRow} disabled={!newTagValue.trim()}>
          Add Tag
        </Button>
      </div>
      <div style={{ marginTop: '18px' }}>{tagList}</div>
    </div>
  )
}

export default memo(TagsArrayComponent)

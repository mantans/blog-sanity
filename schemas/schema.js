// First, we must import the schema creator
import createSchema from 'part:@sanity/base/schema-creator'

// Then import schema types from any plugins that might expose them
import schemaTypes from 'all:part:@sanity/base/schema-type'

// Then we give our schema to the builder and provide the result to Sanity
export default createSchema({
  // We name our schema
  name: 'default',
  // Then proceed to concatenate our document type
  // to the ones provided by any plugins that are installed
  types: schemaTypes.concat([
    {
      name: 'author',
      type: 'document',
      title: 'Author',
      fields: [
        {
          name: 'name',
          title: 'Name',
          type: 'string'
        },
        {
          name: 'avatar',
          title: 'Avatar',
          type: 'image'
        }
      ]
    },
    {
      name: 'blog',
      type: 'document',
      title: 'Blog',
      fields: [
        {
          name: 'title',
          type: 'string',
          title: 'Title',
          validation: (Rule) => [
            Rule.required().min(10).error('A title of min. 10 characters is required'),
            Rule.max(78).warning('Shorter titles are usually better')
          ]
        },
        {
          name: 'subtitle',
          type: 'string',
          title: 'Subtitle',
          validation: Rule => [
            Rule.required().min(10).error('A Subtitle of min. 10 characters is required'),
            Rule.max(78).warning('Shorter Subtitles are usually better')
          ]
        },
        {
          name: 'coverImage',
          title: 'Cover Image',
          type: 'image',
          options: {
            hotspot: true
          },
          fields: [
            {
              type: 'text',
              name: 'alt',
              title: 'Description'
            }
          ]
        },
        {
          name: 'content',
          title: 'Content Image',
          type: 'array',
          of: [
            {
              type: 'block'
            },
            {
              type: 'image',
              fields: [
                {
                  title: 'Position',
                  name: 'position',
                  type: 'string',
                  options: {
                    list: [
                      {title: 'Center', value: 'center'},
                      {title: 'Left', value: 'left'},
                      {title: 'Right', value: 'right'},
                    ],
                    layout: 'radio',
                    isHighlighted: true
                  }
                },
                {
                  type: 'text',
                  name: 'alt',
                  title: 'Description',
                  option: {
                    isHighlighted: true
                  }
                }
              ],
              options: {
                hotspot: true
              }
            },
            {
              type: 'code',
              options: {
                withFilename: true
              }
            }
          ]
        },
        {
          name: 'date',
          title: 'Date',
          type: 'datetime',
          validation: Rule => Rule.required().error('Manuel inser a valid date')
        },
        {
          name: 'author',
          title: 'Author',
          type: 'reference',
          to: [{type: 'author'}],
          validation: Rule => Rule.required().error('Manuel which is the author of this post?')
        },
        {
          name: 'slug',
          type: 'slug',
          title: 'Slug',
          validation: Rule => Rule.required().error('Manuel a slug is required!')
        }
      ]
    }
  ]),
})

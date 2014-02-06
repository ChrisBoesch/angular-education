module.exports = {
  'Video': {
    'id': 'Video',
    'required': ['id', 'title', 'url'],
    'properties': {
      'id': {
        'type': 'integer',
        'format': 'int64',
        'description': 'Unique identifier for the video',
        'minimum': '0.0'
      },
      'title': {
        'type': 'string',
        'description': 'Friendly name of the video'
      },
      'description': {
        'type': 'string',
        'description': 'Description of the video'
      },
      'thumbnail': {
        'type': 'string',
        'description': 'Image URL of the video'
      },
      'url': {
        'type': 'string',
        'description': 'URL of the video'
      },
      'watched': {
        'type': 'boolean',
        'description': 'If this videos has already been watched by the logged in user'
      }
    }
  }
};

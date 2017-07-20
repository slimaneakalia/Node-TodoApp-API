const env = process.env.NODE_ENV || 'development';

if (env == 'development')
	process.env.MONGODB_URI = 'mongodb://localhost:27017/TodoApp_m';
else (env == 'test')
	process.env.MONGODB_URI = 'mongodb://localhost:27017/TodoApp_m_test';
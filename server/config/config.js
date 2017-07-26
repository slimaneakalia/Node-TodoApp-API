const env = process.env.NODE_ENV || 'development';
if (env == 'development')
	process.env.MONGODB_URI = 'mongodb://localhost:27017/TodoApp_m';
else if (!process.env.MONGODB_URI)
	process.env.MONGODB_URI = 'mongodb://localhost:27017/TodoApp_m_test';
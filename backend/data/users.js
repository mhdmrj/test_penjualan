import bcrypt from 'bcryptjs'

const users = [
  {
    name: 'Admin',
    email: 'admin@aegis.com',
    password: bcrypt.hashSync('kanjaya', 10),
    isAdmin: true,
  },
  {
    name: 'Kasir',
    email: 'kasir@aegis.com',
    password: bcrypt.hashSync('kanjaya', 10),
  },  
]

export default users

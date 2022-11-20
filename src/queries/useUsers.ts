import { useQuery } from '@tanstack/react-query'
import { searchUser } from '../API/users'

const useUsers = (name: string) =>
  useQuery({
    queryKey: ['users', name],
    queryFn: () => searchUser(name),
  })

export default useUsers

import useFetch from 'use-http'
/*api generated at 'https://parallel-scarlet-juravenator.glitch.me'*/
function useOwner_groups(host='https://parallel-scarlet-juravenator.glitch.me') {
  const [owner_groups, setOwner_groups] = useState([])
  const { get, post, put, delete, response, loading, error } = useFetch(host)

  useEffect(() => { loadInitialOwner_groups() }, []) // componentDidMount
  
  async function loadInitialOwner_groups() {
    const initialOwner_groups = await get('/Owner_groups')
    if (response.ok) setOwner_groups(initialOwner_groups)
  }

  async function addOwner_group(newOwner_group) {
    await post('/Owner_group', owner_group)
    if (response.ok) setOwner_groups([...owner_groups, newOwner_group]);
  }
  async function updateOwner_group(owner_group) {
    await put('/Owner_groups', owner_group)
    if (response.ok) {
      const newOwner_groups = owner_groups.filter(_owner_group => {
        return _owner_group.owner_group_id !== owner_group.owner_group_id;
      });
      setOwner_groups([...newOwner_groups, owner_group]);
    }
  }
  async function deleteOwner_group(owner_group) {
    await delete('/Owner_groups', owner_group)
    
    if (response.ok) {
      const newOwner_groups = owner_groups.filter(_owner_group => {
        return _owner_group.owner_group_id !== owner_group.owner_group_id;
      });
      setOwner_groups(newOwner_groups);
    }
  }
  return [loading, error,owner_groups,addOwner_group,updateOwner_group,deleteOwner_group]
}
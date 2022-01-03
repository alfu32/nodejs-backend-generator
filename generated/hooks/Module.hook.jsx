import useFetch from 'use-http'
/*api generated at 'https://parallel-scarlet-juravenator.glitch.me'*/
function useModules(host='https://parallel-scarlet-juravenator.glitch.me') {
  const [modules, setModules] = useState([])
  const { get, post, put, delete, response, loading, error } = useFetch(host)

  useEffect(() => { loadInitialModules() }, []) // componentDidMount
  
  async function loadInitialModules() {
    const initialModules = await get('/Modules')
    if (response.ok) setModules(initialModules)
  }

  async function addModule(newModule) {
    await post('/Module', module)
    if (response.ok) setModules([...modules, newModule]);
  }
  async function updateModule(module) {
    await put('/Modules', module)
    if (response.ok) {
      const newModules = modules.filter(_module => {
        return _module.module_id !== module.module_id;
      });
      setModules([...newModules, module]);
    }
  }
  async function deleteModule(module) {
    await delete('/Modules', module)
    
    if (response.ok) {
      const newModules = modules.filter(_module => {
        return _module.module_id !== module.module_id;
      });
      setModules(newModules);
    }
  }
  return [loading, error,modules,addModule,updateModule,deleteModule]
}
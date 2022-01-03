import useFetch from 'use-http'
/*api generated at 'https://parallel-scarlet-juravenator.glitch.me'*/
function useWatchers(host='https://parallel-scarlet-juravenator.glitch.me') {
  const [watchers, setWatchers] = useState([])
  const { get, post, put, delete, response, loading, error } = useFetch(host)

  useEffect(() => { loadInitialWatchers() }, []) // componentDidMount
  
  async function loadInitialWatchers() {
    const initialWatchers = await get('/Watchers')
    if (response.ok) setWatchers(initialWatchers)
  }

  async function addWatcher(newWatcher) {
    await post('/Watcher', watcher)
    if (response.ok) setWatchers([...watchers, newWatcher]);
  }
  async function updateWatcher(watcher) {
    await put('/Watchers', watcher)
    if (response.ok) {
      const newWatchers = watchers.filter(_watcher => {
        return _watcher.watcher_id !== watcher.watcher_id;
      });
      setWatchers([...newWatchers, watcher]);
    }
  }
  async function deleteWatcher(watcher) {
    await delete('/Watchers', watcher)
    
    if (response.ok) {
      const newWatchers = watchers.filter(_watcher => {
        return _watcher.watcher_id !== watcher.watcher_id;
      });
      setWatchers(newWatchers);
    }
  }
  return [loading, error,watchers,addWatcher,updateWatcher,deleteWatcher]
}
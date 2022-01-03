import useFetch from 'use-http'
/*api generated at 'https://parallel-scarlet-juravenator.glitch.me'*/
function useNotifiers(host='https://parallel-scarlet-juravenator.glitch.me') {
  const [notifiers, setNotifiers] = useState([])
  const { get, post, put, delete, response, loading, error } = useFetch(host)

  useEffect(() => { loadInitialNotifiers() }, []) // componentDidMount
  
  async function loadInitialNotifiers() {
    const initialNotifiers = await get('/Notifiers')
    if (response.ok) setNotifiers(initialNotifiers)
  }

  async function addNotifier(newNotifier) {
    await post('/Notifier', notifier)
    if (response.ok) setNotifiers([...notifiers, newNotifier]);
  }
  async function updateNotifier(notifier) {
    await put('/Notifiers', notifier)
    if (response.ok) {
      const newNotifiers = notifiers.filter(_notifier => {
        return _notifier.notifier_id !== notifier.notifier_id;
      });
      setNotifiers([...newNotifiers, notifier]);
    }
  }
  async function deleteNotifier(notifier) {
    await delete('/Notifiers', notifier)
    
    if (response.ok) {
      const newNotifiers = notifiers.filter(_notifier => {
        return _notifier.notifier_id !== notifier.notifier_id;
      });
      setNotifiers(newNotifiers);
    }
  }
  return [loading, error,notifiers,addNotifier,updateNotifier,deleteNotifier]
}
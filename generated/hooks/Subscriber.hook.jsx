import useFetch from 'use-http'
/*api generated at 'https://parallel-scarlet-juravenator.glitch.me'*/
function useSubscribers(host='https://parallel-scarlet-juravenator.glitch.me') {
  const [subscribers, setSubscribers] = useState([])
  const { get, post, put, delete, response, loading, error } = useFetch(host)

  useEffect(() => { loadInitialSubscribers() }, []) // componentDidMount
  
  async function loadInitialSubscribers() {
    const initialSubscribers = await get('/Subscribers')
    if (response.ok) setSubscribers(initialSubscribers)
  }

  async function addSubscriber(newSubscriber) {
    await post('/Subscriber', subscriber)
    if (response.ok) setSubscribers([...subscribers, newSubscriber]);
  }
  async function updateSubscriber(subscriber) {
    await put('/Subscribers', subscriber)
    if (response.ok) {
      const newSubscribers = subscribers.filter(_subscriber => {
        return _subscriber.watcher_id !== subscriber.watcher_id;
      });
      setSubscribers([...newSubscribers, subscriber]);
    }
  }
  async function deleteSubscriber(subscriber) {
    await delete('/Subscribers', subscriber)
    
    if (response.ok) {
      const newSubscribers = subscribers.filter(_subscriber => {
        return _subscriber.watcher_id !== subscriber.watcher_id;
      });
      setSubscribers(newSubscribers);
    }
  }
  return [loading, error,subscribers,addSubscriber,updateSubscriber,deleteSubscriber]
}
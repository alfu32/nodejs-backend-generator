import useFetch from 'use-http'
/*api generated at 'https://parallel-scarlet-juravenator.glitch.me'*/
function useObservables(host='https://parallel-scarlet-juravenator.glitch.me') {
  const [observables, setObservables] = useState([])
  const { get, post, put, delete, response, loading, error } = useFetch(host)

  useEffect(() => { loadInitialObservables() }, []) // componentDidMount
  
  async function loadInitialObservables() {
    const initialObservables = await get('/Observables')
    if (response.ok) setObservables(initialObservables)
  }

  async function addObservable(newObservable) {
    await post('/Observable', observable)
    if (response.ok) setObservables([...observables, newObservable]);
  }
  async function updateObservable(observable) {
    await put('/Observables', observable)
    if (response.ok) {
      const newObservables = observables.filter(_observable => {
        return _observable.observable_id !== observable.observable_id;
      });
      setObservables([...newObservables, observable]);
    }
  }
  async function deleteObservable(observable) {
    await delete('/Observables', observable)
    
    if (response.ok) {
      const newObservables = observables.filter(_observable => {
        return _observable.observable_id !== observable.observable_id;
      });
      setObservables(newObservables);
    }
  }
  return [loading, error,observables,addObservable,updateObservable,deleteObservable]
}
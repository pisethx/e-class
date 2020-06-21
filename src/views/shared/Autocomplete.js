import { Typeahead } from 'react-bootstrap-typeahead' // ES2015
import { USER_AUTOCOMPLETE_QUERY } from './Api'

const BasicExample = ({ type, multiple = true }) => {
  const [multiple, setMultiple] = useState(multiple)
  const [selected, setSelected] = useState([])
  const options = useQuery(USER_AUTOCOMPLETE_QUERY, {
    variables: { name: type },
  })

  // useEffect(() => {
  //   async function fetchUsers() {
  //     try {

  //     } catch (e) {
  //       console.log(e);
  //     }
  //   }
  //   fetchUsers()
  // });

  return (
    <Fragment>
      <Typeahead
        id="basic-typeahead-example"
        labelKey="name"
        multiple={multiple}
        onChange={setSelected}
        options={options}
        placeholder="Choose a state..."
        selected={selected}
      />
      {/* <FormGroup>
        <Control
          checked={multiple}
          onChange={(e) => setMultiple(e.target.checked)}
          type="checkbox">
          Multi-Select
        </Control>
      </FormGroup> */}
    </Fragment>
  )
}

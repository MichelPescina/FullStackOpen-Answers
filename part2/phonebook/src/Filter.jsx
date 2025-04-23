const Filter = ({onChange}) => {
  return (
    <div>
      Only show contacts with:
      <input type='text' onChange={onChange}/>
    </div>
  )
}

export default Filter
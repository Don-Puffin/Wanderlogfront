import React from 'react'

const CreatePost = () => {
  return (
    <div>
        
<form>
  <label>
    Location:
    <input type="text" name="location" />
  </label>
  <label>
    Lng:
    <input type="text" name="lng" />
  </label>
  <label>
    Lat:
    <input type="text" name="lat" />
  </label>
  <label>
    Info:
    <input type="text" name="text" />
  </label>
  <label>
    Info:
    <input type="text" name="rating" />
  </label>
  <label>
    Submit:
  <input type="submit" value="Submit" />
  </label>
</form>



    </div>
  )
}

export default CreatePost
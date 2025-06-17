import React from 'react'

const ImageFileInput = () => {

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selected = event.target.files?.[0]
    if(selected) {
      const reader = new FileReader()
      reader.onload = (e) => {
        const imageUrl = e.target?.result as string
        console.log('Image URL:', imageUrl)
      }
      reader.readAsDataURL(selected)
    }
  }
  return (
    <input
      type="file"
      accept="image/*"
      className="block w-full mb-2"
      onChange={handleChange}
      />
  )
}

export default ImageFileInput
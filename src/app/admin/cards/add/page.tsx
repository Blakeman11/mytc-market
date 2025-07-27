'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

type CardFormData = {
  title: string
  playerName: string
  brand: string
  year: string
  cardNumber: string
  category: string
  condition: string
  grade: string
  variant: string
  price: string
  imageUrl: string
}

export default function AddCardPage() {
  const router = useRouter()

  const [formData, setFormData] = useState<CardFormData>({
    title: '',
    playerName: '',
    brand: '',
    year: '',
    cardNumber: '',
    category: '',
    condition: '',
    grade: '',
    variant: '',
    price: '',
    imageUrl: '',
  })

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      const res = await fetch('/api/admin/cards/add', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      if (res.ok) {
        router.push('/admin/cards')
      } else {
        const errorData = await res.json()
        alert('Error: ' + errorData.error)
      }
    } catch (err) {
      alert('Something went wrong.')
      console.error(err)
    }
  }

  return (
    <div className="max-w-xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Add a New Card</h1>
      <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4">
        {(Object.keys(formData) as (keyof CardFormData)[]).map((key) => (
          <input
            key={key}
            type="text"
            name={key}
            value={formData[key]}
            onChange={handleChange}
            placeholder={key}
            className="p-2 border rounded"
            required
          />
        ))}

        <button
          type="submit"
          className="bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          Submit
        </button>
      </form>
    </div>
  )
}
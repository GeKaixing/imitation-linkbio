// LinkDataContext.js
import React, { createContext, useContext, useReducer, useEffect } from 'react'

const LinkDataContext = createContext()
const LinkDataDispatchContext = createContext()

const initialState = {
  linkData: [],
  id:'',
  loading: true, // 页面首次加载
  submitting: false, // 提交数据时的 loading（新增字段）
  error: null,
}

// 🔧 Reducer
function linkDataReducer(state, action) {
  switch (action.type) {
    case 'SET_LINK_DATA':
      return { ...state, linkData: action.payload, loading: false, error: null }

    case 'SET_LOADING':
      return { ...state, loading: action.payload }

    case 'SET_SUBMITTING':
      return { ...state, submitting: action.payload.submitting,id:action.payload.id }

    case 'ADD_LINK_OPTIMISTIC':
      return {
        ...state,
        linkData: [action.payload, ...state.linkData],
      }

    case 'ADD_LINK_ROLLBACK':
      return {
        ...state,
        linkData: state.linkData.filter((i) => i.tempId !== action.payload),
      }

    case 'UPDATE_LINK_OPTIMISTIC':
      return {
        ...state,
        linkData: state.linkData.map((item) =>
          item.id === action.payload.id ? { ...item, ...action.payload } : item
        ),
      }

    case 'DELETE_LINK_OPTIMISTIC':
      return {
        ...state,
        linkData: state.linkData.filter((item) => item.id !== action.payload.id),
      }

    case 'SET_ERROR':
      return { ...state, error: action.payload, loading: false, submitting: false }

    default:
      throw new Error(`Unknown action type: ${action.type}`)
  }
}

export function LinkDataProvider({ children }) {
  const [state, dispatch] = useReducer(linkDataReducer, initialState)

  // 📥 初始加载
  useEffect(() => {
    async function load() {
      dispatch({ type: 'SET_LOADING', payload: true })
      try {
        const res = await fetch('/api/link-data')
        if (!res.ok) throw new Error('Failed to load data')
        const json = await res.json()
        dispatch({ type: 'SET_LINK_DATA', payload: json })
      } catch (err) {
        dispatch({ type: 'SET_ERROR', payload: err.message })
      } finally {
        dispatch({ type: 'SET_LOADING', payload: false })
      }
    }
    load()
  }, [])

  // 🔧 封装异步操作：带乐观更新 + 提交状态
  const api = {
    async addLink(link) {
      const tempId = `temp-${Date.now()}`
      const optimisticItem = { ...link, tempId }
      dispatch({ type: 'ADD_LINK_OPTIMISTIC', payload: optimisticItem })
      dispatch({ type: 'SET_SUBMITTING', payload: true,})

      try {
        const res = await fetch('/api/link-data', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(link),
        })
        if (!res.ok) throw new Error('Add failed')
        const saved = await res.json()
        dispatch({
          type: 'UPDATE_LINK_OPTIMISTIC',
          payload: { ...saved, id: saved.id },
        })
      } catch (err) {
        dispatch({ type: 'ADD_LINK_ROLLBACK', payload: tempId })
        dispatch({ type: 'SET_ERROR', payload: err.message })
      } finally {
        dispatch({ type: 'SET_SUBMITTING', payload: false })
      }
    },

    async updateLink(updated) {
      const backup = state.linkData.find((i) => i.id === updated.id)
      dispatch({ type: 'UPDATE_LINK_OPTIMISTIC', payload: updated })
      dispatch({ type: 'SET_SUBMITTING', payload: true })

      try {
        const res = await fetch('/api/link-data', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(updated),
        })
        if (!res.ok) throw new Error('Update failed')
      } catch (err) {
        dispatch({ type: 'UPDATE_LINK_OPTIMISTIC', payload: backup })
        dispatch({ type: 'SET_ERROR', payload: err.message })
      } finally {
        dispatch({ type: 'SET_SUBMITTING', payload: false })
      }
    },

    async deleteLink(id) {
      const backup = state.linkData.find((i) => i.id === id)
      dispatch({ type: 'DELETE_LINK_OPTIMISTIC', payload: id })
      dispatch({ type: 'SET_SUBMITTING', payload: true })

      try {
        const res = await fetch('/api/link-data', {
          method: 'DELETE',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ id }),
        })
        if (!res.ok) throw new Error('Delete failed')
      } catch (err) {
        dispatch({ type: 'ADD_LINK_OPTIMISTIC', payload: backup })
        dispatch({ type: 'SET_ERROR', payload: err.message })
      } finally {
        dispatch({ type: 'SET_SUBMITTING', payload: false })
      }
    },
  }

  return (
    <LinkDataContext.Provider value={state}>
      <LinkDataDispatchContext.Provider value={api}>
        {children}
      </LinkDataDispatchContext.Provider>
    </LinkDataContext.Provider>
  )
}

// 📦 自定义 Hook
export function useLinkData() {
  return useContext(LinkDataContext)
}

export function useLinkDataDispatch() {
  return useContext(LinkDataDispatchContext)
}

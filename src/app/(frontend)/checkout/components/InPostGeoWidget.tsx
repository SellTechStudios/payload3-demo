import React, { useCallback, useEffect } from 'react'

declare global {
  interface Window {
    onPoint: (e?: Location) => void
  }
}

export const InpostGeowidget = ({ onPoint }: { onPoint: (e: Location) => void }) => {
  const callback = useCallback((e: Location) => onPoint(e), [onPoint])

  useEffect(() => {
    const css: HTMLLinkElement = document.createElement('link'),
      js: HTMLScriptElement = document.createElement('script'),
      body: HTMLElement = document.getElementsByTagName('body')[0]

    css.rel = 'stylesheet'
    css.href = 'https://geowidget.inpost.pl/inpost-geowidget.css'
    css.type = 'text/css'

    js.defer = true
    js.src = 'https://geowidget.inpost.pl/inpost-geowidget.js'

    body.appendChild(css)
    body.appendChild(js)
  }, [])

  useEffect(() => {
    window.onPoint = callback
  }, [callback])

  return React.createElement('inpost-geowidget', {
    token:
      'eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJzQlpXVzFNZzVlQnpDYU1XU3JvTlBjRWFveFpXcW9Ua2FuZVB3X291LWxvIn0.eyJleHAiOjIwNDMyNzQyMzcsImlhdCI6MTcyNzkxNDIzNywianRpIjoiYTcxMzcxODYtNDlhYi00NjYyLTkzNWYtMTdmZGNkZDZiYWFlIiwiaXNzIjoiaHR0cHM6Ly9sb2dpbi5pbnBvc3QucGwvYXV0aC9yZWFsbXMvZXh0ZXJuYWwiLCJzdWIiOiJmOjEyNDc1MDUxLTFjMDMtNGU1OS1iYTBjLTJiNDU2OTVlZjUzNTo4WkQ0TTZTbEl0MmtvUG9PMUdtYW5QNWEwVmdhZkZfUWdYMkFWWVQxSzVBIiwidHlwIjoiQmVhcmVyIiwiYXpwIjoic2hpcHgiLCJzZXNzaW9uX3N0YXRlIjoiZDZkZDcxOGEtM2FmZC00NjIwLWI0YTQtODQ0YmNmYTA1MGU2Iiwic2NvcGUiOiJvcGVuaWQgYXBpOmFwaXBvaW50cyIsInNpZCI6ImQ2ZGQ3MThhLTNhZmQtNDYyMC1iNGE0LTg0NGJjZmEwNTBlNiIsImFsbG93ZWRfcmVmZXJyZXJzIjoiIiwidXVpZCI6ImI4NTcyNmMwLTAyMDktNDg4My1hNGVkLTI1NTQ4NmQ3OGJmNSJ9.hD9VLlPWxy_Sl-5-wrxMjBQ_NQe7Si6eoXk9D7imMcpOxrueR9axTcWgWgNACjI-FTfnKWmVuXsJiasTxmzP7qvqbm8e9SOF9_K6qcOvCn1kXd9Hq3YijyT4aeYbDMkct2C2CBOGNL6xZ-NANDYSZ8T_GjnZIMBXmx9z-ZGcA6NroZY8ThqjP-AKGLSAHVcyMcsc7CmXd1MWFJHa2WPgIq8vUKFLc-D3vgYA-4ErkUxhDv2wfUoBQGU0FGlysEVHNn7_5vcg3tcYxLd6X3T20nwWg4LZ7R04HGW1zHga-pRwSHOHh3lF4lw8u-qjXEzccdpmCkG-GWutmP4Oc576tg',
    onPoint: 'onPoint',
    language: 'pl',
    config: 'parcelCollect',
  })
}

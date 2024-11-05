'use client'

import React, { useState, useEffect, useRef } from 'react'
import { Check, ChevronDown, Download, Moon, Sun, Link, Image as ImageIcon } from 'lucide-react'
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Switch } from "@/components/ui/switch"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import * as themes from 'react-syntax-highlighter/dist/esm/styles/prism'
import { useQueryState } from 'nuqs'
import html2canvas from 'html2canvas'
import LZString from 'lz-string'
const languages = [
  { name: 'Auto Detect', value: 'auto' },
  { name: 'JavaScript', value: 'javascript' },
  { name: 'TypeScript', value: 'typescript' },
  { name: 'Python', value: 'python' },
  { name: 'Java', value: 'java' },
  { name: 'C++', value: 'cpp' },
  { name: 'Swift', value: 'swift' },
  { name: 'Go', value: 'go' },
  { name: 'Ruby', value: 'ruby' },
]

const colorThemes = [
  { name: 'Candy', class: 'bg-gradient-to-br from-pink-400 to-purple-500' },
  { name: 'Ocean', class: 'bg-gradient-to-br from-blue-400 to-cyan-500' },
  { name: 'Forest', class: 'bg-gradient-to-br from-green-400 to-emerald-500' },
  { name: 'Sunset', class: 'bg-gradient-to-br from-orange-400 to-red-500' },
]

const paddings = [
  { value: 16, label: '16' },
  { value: 32, label: '32' },
  { value: 64, label: '64' },
  { value: 128, label: '128' },
]

function detectLanguage(code: string): string {
  const jsPattern = /\b(var|let|const|function|return|if|for|while)\b/
  const tsPattern = /\b(interface|type|namespace|enum)\b/
  const pyPattern = /\b(def|import|from|class|if __name__ == "__main__")\b/
  const javaPattern = /\b(public|class|void|static|final)\b/
  const cppPattern = /\b(#include|using namespace|int main|std::)\b/
  const swiftPattern = /\b(func|var|let|guard|import Foundation)\b/
  const goPattern = /\b(func|package|import|type|struct)\b/
  const rubyPattern = /\b(def|class|require|attr_accessor|puts)\b/

  if (jsPattern.test(code)) return 'javascript'
  if (tsPattern.test(code)) return 'typescript'
  if (pyPattern.test(code)) return 'python'
  if (javaPattern.test(code)) return 'java'
  if (cppPattern.test(code)) return 'cpp'
  if (swiftPattern.test(code)) return 'swift'
  if (goPattern.test(code)) return 'go'
  if (rubyPattern.test(code)) return 'ruby'

  return 'plaintext'
}

export default function Component() {
    const [compressedCode, setCompressedCode] = useQueryState('code', {
        defaultValue: LZString.compressToEncodedURIComponent('// Write your code here...'),
      })
      
      const code = LZString.decompressFromEncodedURIComponent(compressedCode) || ''
    
  const [language, setLanguage] = useState(languages[0])
  const [detectedLanguage, setDetectedLanguage] = useState('')
  const [darkMode, setDarkMode] = useState(true)
  const [padding, setPadding] = useState(64)
  const [background, setBackground] = useState(true)
  const [currentTheme, setCurrentTheme] = useState(colorThemes[0])
  const [syntaxTheme, setSyntaxTheme] = useState(themes.vscDarkPlus)
  const codeRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setSyntaxTheme(darkMode ? themes.vscDarkPlus : themes.vs)
  }, [darkMode])

  useEffect(() => {
    if (language.value === 'auto' && code.trim() !== '') {
      const detected = detectLanguage(code)
      setDetectedLanguage(detected)
    } else {
      setDetectedLanguage(language.value)
    }
  }, [code, language])

  const handleCodeChange = (newCode: string) => {
    const compressed = LZString.compressToEncodedURIComponent(newCode)
    setCompressedCode(compressed)
  }

  const handleLanguageChange = (lang: typeof languages[0]) => {
    setLanguage(lang)
    if (lang.value !== 'auto') {
      setDetectedLanguage(lang.value)
    }
  }

  const exportImage = async () => {
    if (codeRef.current) {
      const canvas = await html2canvas(codeRef.current, {
        scrollY: -window.scrollY,
        height: codeRef.current.scrollHeight,
      })
      const id=Math.random()+Date.now()
      const image = canvas.toDataURL("image/png")
      const link = document.createElement('a')
      link.href = image
      link.download = `code-image${id}.png`
      link.click()
    }
  }

  const copyUrl = () => {
    const url = new URL(window.location.href)
    url.searchParams.set('code', compressedCode)
    navigator.clipboard.writeText(url.toString())
      .then(() => alert('URL copied to clipboard!'))
      .catch((err) => console.error('Failed to copy URL: ', err))
  }

  return (
    <div className={`min-h-screen ${darkMode ? 'dark' : ''}`}>
      <div className="bg-background text-foreground min-h-screen flex flex-col">
        <header className="border-b border-border">
          <div className="container mx-auto px-4 py-3 flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <Button variant="ghost" className="text-lg font-semibold">
                Code Images
              </Button>
            </div>
            <div className="flex items-center space-x-2">
              <Button variant="ghost" size="sm">
                About
              </Button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="default" size="sm">
                    <Download className="w-4 h-4 mr-2" />
                    Export
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem onClick={exportImage}>
                    <ImageIcon className="w-4 h-4 mr-2" />
                    Download Image
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={copyUrl}>
                    <Link className="w-4 h-4 mr-2" />
                    Copy URL
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </header>

        <main className="flex-1 container mx-auto p-4 flex flex-col items-center justify-center overflow-hidden">
          <div
            ref={codeRef}
            className={`w-full max-w-4xl rounded-lg shadow-2xl ${
              background ? currentTheme.class : 'bg-background'
            } p-4 md:p-8`}
          >
            <div
              className={`bg-background rounded-lg shadow-lg overflow-hidden`}
              style={{ padding: padding }}
            >
              <div className="flex items-center space-x-2 mb-4 px-4 pt-2">
                <div className="flex space-x-2">
                  <div className="w-3 h-3 rounded-full bg-red-500" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500" />
                  <div className="w-3 h-3 rounded-full bg-green-500" />
                </div>
              </div>
              <ScrollArea className="h-[400px] w-full">
                <div className="relative">
                  <textarea
                    value={code}
                    onChange={(e) => handleCodeChange(e.target.value)}
                    className="w-full bg-transparent resize-none focus:outline-none font-mono text-sm absolute top-0 left-0 overflow-hidden whitespace-pre"
                    style={{
                      color: 'transparent',
                      caretColor: darkMode ? 'white' : 'black',
                      zIndex: 1,
                      height: '100%',
                    }}
                    spellCheck="false"
                  />
                  <SyntaxHighlighter
                    language={detectedLanguage}
                    style={syntaxTheme}
                    customStyle={{
                      margin: 0,
                      padding: 0,
                      background: 'transparent',
                    }}
                    className="pointer-events-none"
                  >
                    {code}
                  </SyntaxHighlighter>
                </div>
              </ScrollArea>
            </div>
          </div>
        </main>

        <footer className="border-t border-border">
          <div className="container mx-auto px-4 py-3">
            <div className="flex flex-wrap justify-center items-center gap-4">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm">
                    {currentTheme.name}
                    <ChevronDown className="w-4 h-4 ml-2" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  {colorThemes.map((theme) => (
                    <DropdownMenuItem
                      key={theme.name}
                      onClick={() => setCurrentTheme(theme)}
                    >
                      <Check
                        className={`w-4 h-4 mr-2 ${
                          theme.name === currentTheme.name ? 'opacity-100' : 'opacity-0'
                        }`}
                      />
                      {theme.name}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>

              <div className="flex items-center space-x-2">
                <span className="text-sm">Background</span>
                <Switch
                  checked={background}
                  onCheckedChange={setBackground}
                />
              </div>

              <div className="flex items-center space-x-2">
                <span className="text-sm">Dark mode</span>
                <Switch
                  checked={darkMode}
                  onCheckedChange={setDarkMode}
                />
                {darkMode ? (
                  <Moon className="w-4 h-4" />
                ) : (
                  <Sun className="w-4 h-4" />
                )}
              </div>

              <div className="flex items-center space-x-2">
                <span className="text-sm">Padding</span>
                <div className="flex">
                  {paddings.map((p) => (
                    <Button
                      key={p.value}
                      variant={padding === p.value ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setPadding(p.value)}
                      className="rounded-none first:rounded-l-md last:rounded-r-md"
                    >
                      {p.label}
                    </Button>
                  ))}
                </div>
              </div>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm">
                    {language.value === 'auto' && detectedLanguage
                      ? `Auto (${detectedLanguage})`
                      : language.name}
                    <ChevronDown className="w-4 h-4 ml-2" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  {languages.map((lang) => (
                    <DropdownMenuItem
                      key={lang.name}
                      onClick={() => handleLanguageChange(lang)}
                    >
                      <Check
                        className={`w-4 h-4 mr-2 ${
                          lang.name === language.name ? 'opacity-100' : 'opacity-0'
                        }`}
                      />
                      {lang.name}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </footer>
      </div>
    </div>
  )
}
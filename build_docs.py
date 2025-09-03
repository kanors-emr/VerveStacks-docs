#!/usr/bin/env python3
"""
Simple script to build and optionally serve the VerveStacks documentation locally.
"""

import os
import sys
import subprocess
import webbrowser
from pathlib import Path

def run_command(cmd, cwd=None):
    """Run a command and return success status."""
    try:
        result = subprocess.run(cmd, shell=True, cwd=cwd, check=True, 
                              capture_output=True, text=True)
        print(f"✓ {cmd}")
        return True
    except subprocess.CalledProcessError as e:
        print(f"✗ {cmd}")
        print(f"Error: {e.stderr}")
        return False

def main():
    """Build the documentation and optionally serve it."""
    docs_dir = Path(__file__).parent
    build_dir = docs_dir / "_build" / "html"
    
    print("🔨 Building VerveStacks Documentation...")
    print(f"📁 Working directory: {docs_dir}")
    
    # Check if sphinx-build is available
    if not run_command("sphinx-build --version"):
        print("\n❌ Sphinx not found. Please install requirements:")
        print("   pip install -r requirements.txt")
        return 1
    
    # Clean previous build
    print("\n🧹 Cleaning previous build...")
    if build_dir.exists():
        run_command(f"rm -rf {build_dir}" if os.name != 'nt' else f"rmdir /s /q {build_dir}", cwd=docs_dir)
    
    # Build HTML documentation
    print("\n📖 Building HTML documentation...")
    if not run_command("sphinx-build -b html . _build/html", cwd=docs_dir):
        print("\n❌ Build failed!")
        return 1
    
    print(f"\n✅ Documentation built successfully!")
    print(f"📂 Output location: {build_dir}")
    
    # Check if we should serve the docs
    serve = len(sys.argv) > 1 and sys.argv[1] == "--serve"
    
    if serve:
        print("\n🌐 Starting local server...")
        index_file = build_dir / "index.html"
        
        if index_file.exists():
            # Try to open in browser
            try:
                webbrowser.open(f"file://{index_file.absolute()}")
                print(f"🚀 Opened documentation in browser: {index_file}")
            except Exception as e:
                print(f"⚠️  Could not open browser automatically: {e}")
                print(f"📖 Open manually: {index_file}")
        else:
            print("❌ index.html not found in build output")
            return 1
    else:
        index_file = build_dir / "index.html"
        print(f"\n📖 To view the documentation, open: {index_file}")
        print("💡 Or run: python build_docs.py --serve")
    
    return 0

if __name__ == "__main__":
    sys.exit(main())

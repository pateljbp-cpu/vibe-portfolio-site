# Windows Node.js Setup Guide (PowerShell, Cursor)

One-time setup so `node` and `npm` work in PowerShell and Cursor. Optimized for a personal Windows 10/11 machine with full admin rights.

---

## 1. Recommended approach: **nvm-windows**

**Use nvm-windows** (Node Version Manager for Windows), not a direct Node LTS installer.

| | Direct Node LTS | nvm-windows |
|---|----------------|-------------|
| Multiple projects, different Node versions | No (one version) | Yes |
| Upgrading / trying Node 18, 20, 22 | Uninstall/reinstall | `nvm install 20` then `nvm use 20` |
| PATH conflicts | Possible with old installs | Managed by nvm |
| Future-proofing | Manual | One place to manage versions |

**Why it matters:** You’ll have multiple JS projects; some may need Node 18, others 20 or 22. nvm lets you switch without uninstalling and keeps one clean PATH.

---

## 2. Remove old Node (if any)

Avoid “node not recognized” or wrong version caused by an old install.

1. **Windows key** → type **Apps & features** → open it.
2. Search for **Node.js**.
3. If you see **Node.js** (or “Node.js (x64)” etc.), **Uninstall** it.
4. Reboot once after uninstall (recommended).

**Why:** nvm-windows will manage Node and PATH. A leftover Node install can take over PATH and confuse both `node` and `nvm`.

---

## 3. Install nvm-windows

1. **Download the installer**
   - Open: https://github.com/coreybutler/nvm-windows/releases  
   - Under **Latest**, download **nvm-setup.exe** (not the zip).

2. **Run nvm-setup.exe**
   - If prompted, “Run as administrator.”
   - Accept the default install path (e.g. `C:\Users\jayep\AppData\Roaming\nvm`).
   - Accept the default symlink path for Node (e.g. `C:\Program Files\nodejs`).  
   - Finish the installer.

3. **Close every PowerShell and Cursor window**
   - So they don’t keep the old PATH.

4. **Open a new PowerShell** (normal or Admin is fine).

**Why:** nvm-windows adds itself and the Node symlink to your user PATH. New processes (including new terminals) need to start after that.

---

## 4. Install Node 20 and set it as active

In the **new** PowerShell, run these exactly:

```powershell
# See nvm version (confirms nvm is on PATH)
nvm version

# Install Node 20 LTS (latest 20.x)
nvm install 20

# Use Node 20 in this session and set it as default for new sessions
nvm use 20
```

**Why:** Node 20 is the current LTS; `nvm use 20` makes it the active version and nvm-windows remembers it for new terminals.

---

## 5. Verify installation

Run in order:

```powershell
# Should show v20.x.x
node -v

# Should show 10.x or higher
npm -v

# Should point under nvm (e.g. C:\Program Files\nodejs\node.exe)
where.exe node
```

- **node -v** → Confirms Node 20 is the one in use.
- **npm -v** → npm is bundled with Node; if node works, npm should too.
- **where.exe node** → Confirms the `node` you’re running is the one nvm manages (path should be under `Program Files\nodejs` or the symlink path you chose), not some leftover install.

---

## 6. Confirm PATH is correct

```powershell
# Print PATH for current user (one long line)
[Environment]::GetEnvironmentVariable("Path", "User")

# Or split into lines to read
[Environment]::GetEnvironmentVariable("Path", "User") -split ';' | Where-Object { $_ -match 'nvm|nodejs' }
```

You should see:
- Something like `...\AppData\Roaming\nvm`
- And the symlink path, e.g. `C:\Program Files\nodejs`

**Why:** If `node` isn’t found, PATH usually doesn’t include the nvm / Node path. The installer adds it for the **User**; new terminals inherit that.

---

## 7. Restarting PowerShell and Cursor

- **PowerShell:** Close the window and open a new one. No special “restart” command needed.
- **Cursor:** Fully quit Cursor (File → Exit or close the app), then open Cursor again. Open a new terminal (**Ctrl+`** or Terminal → New Terminal).

**Why:** PATH is read when the process starts. Restarting ensures Cursor’s terminal sees the updated PATH with nvm and Node.

---

## 8. Install Node 20 (reference)

If you’re on a clean machine or added nvm later:

```powershell
nvm install 20
nvm use 20
```

To install a specific 20.x:

```powershell
nvm install 20.18.0
nvm use 20.18.0
```

---

## 9. Confirm npm is working

```powershell
npm -v
npm config get prefix
```

- **npm -v** → Version number (e.g. 10.x).
- **npm config get prefix** → Should match your Node install (e.g. `C:\Program Files\nodejs`). If it points somewhere odd, global installs can go to the wrong place.

Quick sanity check:

```powershell
cd "C:\Users\jayep\Coding Projects\vibe-portfolio-site"
npm install
```

If that runs without “npm is not recognized”, you’re set.

---

## 10. Best practices (personal dev machine)

- **One default version:** Use `nvm use 20` and leave it; nvm-windows will use it for new shells.
- **Optional: .nvmrc per project:** In a project root you can add a `.nvmrc` file containing `20`. Then in that folder you can run `nvm use` (nvm-windows reads the file) so everyone on the team gets the same version.
- **Don’t install Node from nodejs.org** while using nvm; use only `nvm install` / `nvm use`.
- **Global npm tools:** Install with `npm install -g <pkg>`; they’ll live under the active Node version. Switching with `nvm use 18` means a different set of globals (by design).

---

## 11. If `nvm use 20` doesn’t persist

**Symptom:** New PowerShell or Cursor terminal doesn’t have Node 20 (or `node` not found).

**Do this:**

1. **Confirm nvm default:**
   ```powershell
   nvm current
   ```
   Should show something like `20.18.0`. If it says “none” or another version, run:
   ```powershell
   nvm use 20
   ```
   again.

2. **Force default in every new PowerShell (optional):**  
   Edit your PowerShell profile so every new shell uses Node 20:
   ```powershell
   # Create profile if it doesn’t exist
   if (!(Test-Path -Path $PROFILE)) { New-Item -ItemType File -Path $PROFILE -Force }
   notepad $PROFILE
   ```
   Add this line at the end (use your actual 20.x version if you want to pin):
   ```powershell
   nvm use 20
   ```
   Save, then close and open PowerShell. Now every new session runs `nvm use 20`.

3. **PATH order:** If you have another Node (e.g. from Chocolatey or an old install), remove it from **User** and **System** PATH so only nvm’s paths remain. Then restart terminals.

---

## 12. Cursor terminal using the correct Node

1. **Quit Cursor completely** after installing nvm and Node (so it reloads PATH).
2. Open Cursor, then **Terminal → New Terminal** (or **Ctrl+`**).
3. Run:
   ```powershell
   node -v
   where.exe node
   ```
   You should see Node 20 and a path under nvm’s symlink (e.g. `C:\Program Files\nodejs`).

If Cursor still doesn’t see `node`:

- Confirm in **external** PowerShell (outside Cursor) that `node -v` and `where.exe node` work.
- If they do, Cursor was likely started before PATH was updated. Fully quit Cursor and open it again.
- As a last check: Cursor → **Settings** → search “terminal integrated env” and ensure you’re not overriding PATH; on a clean setup you usually don’t need to set anything.

---

## Quick checklist

- [ ] Old Node.js uninstalled (if it was there) and machine rebooted
- [ ] nvm-setup.exe installed, all PowerShell/Cursor windows closed, new PowerShell opened
- [ ] `nvm install 20` and `nvm use 20` run
- [ ] `node -v` shows v20.x.x
- [ ] `npm -v` shows 10.x or higher
- [ ] `where.exe node` points to nvm’s Node (e.g. under `Program Files\nodejs`)
- [ ] Cursor fully restarted, new terminal runs `node -v` and `npm install` in your project

After this, you’re set for “vibe coding” with a stable, flexible Node setup on Windows.

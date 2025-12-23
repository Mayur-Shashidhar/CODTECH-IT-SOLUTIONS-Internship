'''
Created on Sep 21, 2010

@author: Aaron Jubbal

Wrapper Script for FLACore.py
'''

"""==================================================================================================================
FileZilla Log Analyzer version 1.10 Alpha by Aaron Jubbal
See README for details. Brief overview of flags:

-p --parse <line number> = parse original log by splitting at login/logout for the session that 
    corresponds with the line number
-s --scramble <[f],[u],[v],[i]> = f: scramble file/folder names
                                  u: scramble user names
                                  v: scramble user names in number format
                                  i: scramble ip addresses
-f --filter <[u],[i],[d],[p]> = u: by user name
                                i: by IP address
                                d: by date
                                p: by port
-d = display login/logout instances
-F = force execution, if a file is going to be overwritten, prompts for overwriting are withheld and the file is
     overwritten
====================================================================================================================="""

import sys

def isPythonVersion(version):
    """Check if current Python version meets minimum requirement."""
    return sys.version_info >= (version, 0)

if __name__ == '__main__':
    if not isPythonVersion(3):
        version_str = f"{sys.version_info.major}.{sys.version_info.minor}"
        print(f"You are running Python version {version_str}, version 3.6 or higher is required. Please update. Aborting...")
        exit()
    import FLACore
    FLACore.main(sys.argv)

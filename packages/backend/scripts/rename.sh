if ! [ -x "$(command -v rename)" ]; then
  echo 'Error: rename is not installed.' >&2
  exit 1
fi
# work rename
find . -depth -type f -execdir rename 's/__usecase__/__module__/' {} +;
find . -depth -type d -execdir rename 's/__usecase__/__module__/' {} +;


# TODO: use mv rather than rename
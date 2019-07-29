#!/bin/bash

# ###### FUNCTION ######
platform="$(uname)"
case $platform in
'Darwin')
  platform='mac'
  ;;
'Linux')
  platform='linux'
  ;;
'WindowsNT')
  platform='win'
  ;;
'MINGW64_NT-10.0')
  platform='win'
  ;;
'FreeBSD')
  platform='freebsd'
  ;;
'SunOS')
  platform='solaris'
  ;;
'AIX') ;;
*) ;;
esac
echo "$OS"

function echo_fail() {
  printf "\e[31m✘ ${1}"
  printf "\033\e[0m"
}

function echo_pass() {
  printf "\e[32m✔ ${1}"
  printf "\033\e[0m"
}

function echo_done() {
  printf "\e[32m✨  ${1}"
  printf "\033\e[0m"
}

function clean_schema() {
  if [ -d schema ]; then
    git config -f .gitmodules --remove-section submodule.schema
    git config -f .git/config --remove-section submodule.schema
    git rm --cached schema -f -r
    rm -rf .git/modules/schema
    rm -rf schema
  fi
}

function update_schema() {
  clean_schema
  git submodule add git@github.com:zoobc/zoobc-schema.git schema --force
  git submodule sync
  git submodule update --init --recursive
  echo "$(echo_pass) ${1} submodule zoobc-schema Done"
  reduce_code
}

function reduce_code() {
  directory="./schema/service"
  if [ -d "${directory}" ]; then
    find $directory -type f -exec grep -qe "google" {} \; -exec sed -i '' -e '/google/d' {} +
    find $directory -type f -exec grep -qe "get" {} \; -exec sed -i '' -e '/get/d' {} +
    find $directory -type f -exec grep -qe "};" {} \; -exec sed -i '' -e '/};/d' {} +
    echo "$(echo_pass) Reduce code proto schema Done"
  fi
}

# ###### EXECUTES ######
# 1. Check platform
SECONDS=0
echo "You appear to be running on ${platform}"

# 2. Check submodule zoobc-schema
echo -e "\nChecking submodule zoobc-schema..."
if [ -d schema ]; then
  read -p "Do you want to update submodule zoobc-schema (y/n)? " is_update

  if ! ([ "$is_update" == "y" ] || [ "$is_update" == "Y" ] || [ "$is_update" == "n" ] || [ "$is_update" == "N" ]); then
    echo "Invalid answer, please choose y or n!"
    exit 1
  else
    if ([ "$is_update" == "y" ] || [ "$is_update" == "Y" ]); then
      update_schema "Updating"
    fi
  fi
else
  update_schema "Cloning"
fi

# 3. Download grpc-web
GRPC_WEB_VERSION="1.0.5"
echo -e "\nDownloading grpc-web v${GRPC_WEB_VERSION} for ${platform}..."
if [[ $platform == 'linux' ]]; then
  GRPC_WEB_URL="https://github.com/grpc/grpc-web/releases/download/${GRPC_WEB_VERSION}/protoc-gen-grpc-web-${GRPC_WEB_VERSION}-linux-x86_64"
elif [[ $platform == 'mac' ]]; then
  GRPC_WEB_URL="https://github.com/grpc/grpc-web/releases/download/${GRPC_WEB_VERSION}/protoc-gen-grpc-web-${GRPC_WEB_VERSION}-darwin-x86_64"
elif [[ $platform == 'win' ]]; then
  GRPC_WEB_URL="https://github.com/grpc/grpc-web/releases/download/${GRPC_WEB_VERSION}/protoc-gen-grpc-web-${GRPC_WEB_VERSION}-windows-x86_64.exe"
else
  echo -e "\n$(echo_fail) Cannot download grpc web. Platform ${platform} is not currently supported by grpc web"
  exit 1
fi

if [[ $platform == 'win' ]]; then
  GRPC_WEB_PATH="./protoc-gen-grpc-web.exe"
else
  GRPC_WEB_PATH="/usr/local/bin/protoc-gen-grpc-web"
fi

curl -L -o ${GRPC_WEB_PATH} ${GRPC_WEB_URL}
chmod +x ${GRPC_WEB_PATH}
echo "$(echo_pass) Downloading grpc web v${GRPC_WEB_VERSION} Done"

# 4. Download protobuf base on platform
PROTOC_VERSION="3.9.0"
echo -e "\nDownloading protoc v${PROTOC_VERSION} for ${platform}..."
if [[ $platform == 'linux' ]]; then
  PROTOC_URL="https://github.com/google/protobuf/releases/download/v${PROTOC_VERSION}/protoc-${PROTOC_VERSION}-linux-x86_64.zip"
elif [[ $platform == 'mac' ]]; then
  PROTOC_URL="https://github.com/google/protobuf/releases/download/v${PROTOC_VERSION}/protoc-${PROTOC_VERSION}-osx-x86_64.zip"
elif [[ $platform == 'win' ]]; then
  PROTOC_URL="https://github.com/google/protobuf/releases/download/v${PROTOC_VERSION}/protoc-${PROTOC_VERSION}-win64.zip"
else
  echo -e "\n$(echo_fail) Cannot download protoc. Platform ${platform} is not currently supported by ts-protoc-gen"
  exit 1
fi
curl -L -o "protoc-${PROTOC_VERSION}.zip" ${PROTOC_URL}
echo "$(echo_pass) Downloading protoc v${PROTOC_VERSION} Done"

# 5. Unzip into folder protoc
echo -e "\nExtract protoc-${PROTOC_VERSION}.zip..."
if [ -d protoc ]; then
  rm -rf protoc
fi
mkdir -p protoc
unzip -qq "protoc-${PROTOC_VERSION}.zip" -d protoc
rm -rf "protoc-${PROTOC_VERSION}.zip"
echo "$(echo_pass) Extract protoc-${PROTOC_VERSION}.zip Done"

# 6. Generating proto definitions
echo -e "\nGenerating proto definitions for ${platform}..."
DIST_DIR="./src/proto"
if [ -d "${DIST_DIR}" ]; then
  rm -rf "${DIST_DIR}"
fi
mkdir -p "${DIST_DIR}"
PROTOC=./protoc/bin/protoc

if [[ $platform == 'win' ]]; then
  PROTOC_GEN_TS=$(pwd)"/node_modules/.bin/protoc-gen-ts.cmd"
else
  PROTOC_GEN_TS="./node_modules/.bin/protoc-gen-ts"
fi


$PROTOC \
  --plugin=protoc-gen-grpc-web=${GRPC_WEB_PATH} \
  --plugin=protoc-gen-ts=${PROTOC_GEN_TS} \
  --ts_out=service=true:${DIST_DIR} \
  --js_out=import_style=commonjs,binary:${DIST_DIR} \
  --grpc-web_out=import_style=commonjs,mode=grpcwebtext:${DIST_DIR} \
  ./schema/model/*.proto \
  ./schema/service/*.proto \
  --proto_path=./schema
echo "$(echo_pass) Generating proto definitions for ${platform} Done"

# 7. Cleanup downloaded proto directory
echo -e "\nCleaning temp generator..."
rm -rf protoc
rm -rf ${GRPC_WEB_PATH}
clean_schema

duration=$SECONDS
echo -e "\n\n$(echo_done) Done in $(($duration / 60)) minutes and $(($duration % 60)) seconds."
echo "    The Generating proto in the '${DIST_DIR}' directory!"

sleep 5s